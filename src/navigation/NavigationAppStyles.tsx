export default {
    navBar: {
        
        backgroundColor: "white",
        borderTopColor: "#1B3F7B",
        borderTopStyle: "solid" as "solid",
        borderTopWidth:2 ,
        bottom: 0,
        display: "flex",
        flex: 1,
        overflow: "hidden",
        position: "fixed" as "fixed",
        width: "100%",
        zIndex: 100,
        justifyContent: "center"
        
        
    },
    nav: {
        flex: 1,
        fontSize: "0.9rem",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "3.8rem",
        maxWidth: 1000,
        
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