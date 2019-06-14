import "package:flutter_web/material.dart";
import "package:flex_web_client/models/Place.dart";

class PlaceComponent extends StatelessWidget {
  PlaceComponent({
    Key key,
    @required this.place,
  }) : super(key: key);

  final Place place;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text(place.id),
    );
  }
}