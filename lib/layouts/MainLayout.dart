import "package:flutter_web/material.dart";
import "package:flex_web_client/components/NavigationButton.dart";

class MainLayout extends StatelessWidget {
  MainLayout({
    Key key,
    @required this.screen,
    this.index
  }) : super(key: key);

  final Widget screen;
  final int index;

  List<Widget> getNavButtons(BuildContext context) {
    int i = 0;
    return <Widget>[
      NavigationButton(
        title: Text("Ma place"),
        icon: Icon(Icons.home),
        route: "/",
        selected: index == i++,
      ),
      NavigationButton(
        title: Text("Places"),
        icon: Icon(Icons.search),
        route: "/place_list",
        selected: index == i++,
      ),
      NavigationButton(
        title: Text("Utilisateurs"),
        icon: Icon(Icons.people),
        route: "/user_list",
        selected: index == i++,
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Flex Office"),
        backgroundColor: Colors.blue,
      ),
      body: screen,
      bottomNavigationBar: BottomAppBar(
        child: Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: getNavButtons(context),
        ),
      ),
    );
  }
}