export default {
    navBar: {
        alignSelf: "flex-end",
        backgroundColor: "white",
        borderTopColor: "lightgrey",
        borderTopStyle: "solid" as "solid",
        borderTopWidth: 1,
        bottom: 0,
        display: "flex",
        flex: 1,
        overflow: "hidden",
        position: "fixed" as "fixed",
        width: "100%",
        zIndex: 100,
    },
    nav: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 5,
    },
    navApp: {
        flex: 1,
        flexDirection: "column" as "column",
        height: "100%",
    },
    pageContainer: {
        alignItems: "center",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column" as "column",
        minHeight: "calc(100% - 132px)",
    },
}