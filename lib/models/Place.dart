class Place {
  final String id;
  final String idUser;
  final bool using;

  Place({
      this.id,
      this.idUser,
      this.using,
    });

  factory Place.fromJson(Map<String, dynamic> json) {
    return Place(
      id: json["id"],
      idUser: json["id_user"],
      using: json["using"],
    );
  }
}