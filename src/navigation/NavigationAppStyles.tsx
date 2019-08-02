export default {
    navBar: {
        alignSelf: "flex-end",
        backgroundColor: "white",
        borderTopColor: "#3662A0",
        borderTopStyle: "solid" as "solid",
        borderTopWidth:2 ,
        bottom: 0,
        display: "flex",
        flex: 1,
        overflow: "hidden",
        position: "fixed" as "fixed",
        padding: 6,
        width: "100%",
        zIndex: 100,
        
    },
    nav: {
        flex: 1,
        fontSize: 12,
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