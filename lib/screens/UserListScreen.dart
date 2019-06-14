import "package:flutter_web/material.dart";
import "package:flex_web_client/layouts/MainLayout.dart";

class UserListScreen extends StatefulWidget {
  UserListScreen({
    Key key,
  }) : super(key: key);

  @override
  _UserListScreenState createState() => _UserListScreenState();
}

class _UserListScreenState extends State<UserListScreen> {
  Widget getScreen(BuildContext context) {
    return Container(
      child: Text("User List"),
    );
  }

  @override
  Widget build(BuildContext context) {
    return MainLayout(
      index: 2,
      screen: getScreen(context),
    );
  }
}