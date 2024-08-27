# Setup guide for Web Apps

> This guide can probably be improved, please feel free to contribute.

### React-native-web Setup

To port a react-native mobile app to web using `react-native-web` you just need to ensure the fonts are known on the web-app side.

You will need add the font-family for each font you use to your css.

You can debug missing font-families by looking in the Developer console in your web browser when debugging your web app.

NOTE: if you're using webpack or similar you *may* need to configure webpack to handle loading of ttf fonts, using url-loader or file-loader. See [Web Setup](#web-setup) for more details.

In your `App.css` or similar add the font-family specifications:

```css
@font-face {
  src: url(path/to/fonts/Ionicons.ttf);
  font-family: "Ionicons";
}

@font-face {
  src: url(path/to/fonts/FontAwesome.ttf);
  font-family: "FontAwesome";
}

@font-face {
  src: url(path/to/fonts/FontAwesome5_Brands.ttf);
  font-family: "FontAwesome5_Brands";
  font-weight: 400; /* Regular weight */
  font-style: normal;
}

@font-face {
  src: url(path/to/fonts/FontAwesome5_Regular.ttf);
  font-family: "FontAwesome5_Regular";
  font-weight: 400; /* Regular weight */
  font-style: normal;
}

@font-face {
  src: url(path/to/fonts/FontAwesome5_Solid.ttf);
  font-family: "FontAwesome5_Solid";
  font-weight: 900; /* Bold weight for solid */
  font-style: normal;
}

@font-face {
  src: url(path/to/fonts/MaterialIcons.ttf);
  font-family: "MaterialIcons";
}

@font-face {
  src: url(path/to/fonts/Feather.ttf);
  font-family: "Feather";
}

@font-face {
  src: url(path/to/fonts/MaterialCommunityIcons.ttf);
  font-family: "MaterialCommunityIcons";
}

/* TODO: Add other icons fonts here */
```

### Web Setup

To integrate the library with your web project using [webpack](https://webpack.js.org/), follow these steps:

1.  In your webpack configuration file, add a section to handle TTF files using `url-loader` or `file-loader`:

    ```js
    {
      test: /\.ttf$/,
      loader: "url-loader", // or directly file-loader
      include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
    }
    ```

2.  In your JavaScript entry point, consume the font files and inject the necessary style tag:

        ```js
          import Icon from '@react-native-vector-icons/fontAwesome';

          // Generate the required CSS
          import iconFont from '@react-native-vector-icons/fontawesome/fonts/FontAwesome.ttf';
          const iconFontStyles = `@font-face {
            src: url(${iconFont});
            font-family: FontAwesome;
          }`;

          // Create a stylesheet
          const style = document.createElement('style');
          style.type = 'text/css';

          // Append the iconFontStyles to the stylesheet
          if (style.styleSheet) {
            style.styleSheet.cssText = iconFontStyles;
          } else {
            style.appendChild(document.createTextNode(iconFontStyles));
          }

          // Inject the stylesheet into the document head
          document.head.appendChild(style);
          ```

    By following these steps, you will seamlessly integrate the vector icons
    library into your web project using [webpack](https://webpack.js.org/),
    enabling you to effortlessly use the icons within your web application.
