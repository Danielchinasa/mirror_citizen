export const lightTheme = {
  token: {
    colorPrimary: "#DD0201",
    colorSuccess: "#52c41a",
    colorWarning: "blue",
    colorError: "blue",
    colorInfo: "blue",
    colorTextBase: "rgba(0, 0, 0, 0.85)",
    bgContainer: "#ffffff",
    btnBackground: "#ffffff",
    headingTextColor: "#344138",
    footerBackground: "#354138",
    text: "#000",
    text2: "#CCCCCC",
    text3: "#fff",
    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Button: {
      primaryShadow: "0 2px 0 rgba(5, 48, 89, 0.045)",
    },
    Card: {
      padding: 20,
    },
  },
};

export const darkTheme = {
  token: {
    colorPrimary: "#DD0201",
    colorSuccess: "red",
    colorWarning: "red",
    colorError: "red",
    colorInfo: "#354138",
    colorTextBase: "rgba(255, 255, 255, 0.85)",
    bgContainer: "#354138",
    btnBackground: "#354138",
    headingTextColor: "#ffffff",
    footerBackground: "#DD0201",
    text: "#ffffff",
    text2: "#CCCCCC",
    text3: "#000",
    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Button: {
      primaryShadow: "0 2px 0 rgba(0, 0, 0, 0.045)",
    },
    Card: {
      padding: 20,
    },
  },
};
