import "package:flutter_web/material.dart";
import "package:flex_web_client/layouts/MainLayout.dart";

class MainScreen extends StatefulWidget {
  MainScreen({Key key}) : super(key: key);

  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  TextEditingController placeController = TextEditingController();

  String text = "";

  void takePlace(String placeName) {
    print(placeName);
    setState(() { text = placeName; });
  }

  Widget getScreen(BuildContext context) {
    return Container(
      child: Column(
        children: [
          TextField(
            controller: placeController,
            decoration: InputDecoration(labelText: "Place"),
            keyboardType: TextInputType.text,
            onEditingComplete: () { takePlace(placeController.text); },
          ),
          RaisedButton(
            color: Colors.blue,
            textColor: Colors.white,
            onPressed: () { takePlace(placeController.text); },
            child: Text("CONFIRM"),
          ),
          Text(
            text,
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      index: 0,
      screen: getScreen(context),
    );
  }
}