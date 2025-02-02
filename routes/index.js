import reciptRoutes from "./reciptRoutes.js";

const routeConstructorMethod = (app) => {
  app.use("/receipts", reciptRoutes);
};

export default routeConstructorMethod;
