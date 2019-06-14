import "dart:convert";
import "package:flutter_web/material.dart";
import "package:http/http.dart" as http;
import "package:flex_web_client/layouts/MainLayout.dart";
import "package:flex_web_client/models/Place.dart";
import "package:flex_web_client/components/PlaceComponent.dart";

final String serverUrl = "";
final String serverToken = "";

class PlaceListScreen extends StatefulWidget {
  PlaceListScreen({
    Key key,
  }) : super(key: key);

  @override
  _PlaceListScreenState createState() => _PlaceListScreenState();
}

class _PlaceListScreenState extends State<PlaceListScreen> {
  List<Place> places = [];
  bool loading = false;

  Future<List<Place>> fetchPlaces() async {
    final response = await http.get("$serverUrl/api/places", headers: { "authorization": "Bearer $serverToken" });
    if (response.statusCode == 200) {
      var result = json.decode(response.body);
      List<Place> jobs = [];
      for (var job in result) {
        jobs.add(Place.fromJson(job));
      }
      return jobs;
    } else {
      print(response.body);
      throw Exception("Failed to load places");
    }
  }

  void updatePlaces() async {
    setState(() { loading = true; });
    var newPlaces = await fetchPlaces();
    setState(() { places = newPlaces; loading = false; });
  }

  Widget makePlaceList(List<Place> jobs) {
    return (loading) ? Center(
      child:CircularProgressIndicator(),
    ) : (places.length > 0) ? ListView.builder(
      itemCount: places.length,
      itemBuilder: (context, int index) {
        return PlaceComponent(place: places[index]);
      },
    ) : new Container();
  }

  Widget getScreen(BuildContext context) {
    return Container(
      child: Column(
        children: [
          Text("Place List"),
          Expanded(child: makePlaceList(places)),
        ],
      )
    );
  }

  void initAsyncState() async {
    updatePlaces();
  }

  @override
  void initState() {
    super.initState();
    initAsyncState();
  }

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      index: 1,
      screen: getScreen(context),
    );
  }
}