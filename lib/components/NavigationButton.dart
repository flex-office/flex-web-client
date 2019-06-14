import "package:flutter_web/material.dart";

class NavigationButton extends StatelessWidget {
  NavigationButton({
    Key key,
    @required this.title,
    @required this.icon,
    @required this.route,
    this.selected = false,
  }) : super(key: key);

  final Widget title;
  final Widget icon;
  final String route;
  final bool selected;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: InkWell(
        onTap: () {
          if (!selected) {
            Navigator.pushNamed(context, route);
          }
        },
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            icon,
            title,
          ],
        ),
      ),
    );
  }
}