// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import "package:flutter_web/material.dart";
import "package:flex_web_client/screens/MainScreen.dart";
import "package:flex_web_client/screens/PlaceListScreen.dart";
import "package:flex_web_client/screens/UserListScreen.dart";

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Flex Office",
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      debugShowCheckedModeBanner: false,
      initialRoute: "/",
      routes: {
        "/": (context) => MainScreen(),
        "/place_list": (context) => PlaceListScreen(),
        "/user_list": (context) => UserListScreen(),
      },
    );
  }
}