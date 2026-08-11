import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Pega o seu HTML como base
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // 1. Ensina o Webpack a ler as tags <img> dentro do HTML
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      // 2. Copia as imagens encontradas para a pasta dist preservando o nome
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: 'img/[name][ext]'
        }
      }
    ],
  },
  devServer: {
    static: [{ directory: path.join(__dirname, "src") }],
    port: 3000,
    open: true,
  },
};
