import VueRouter from "vue-router";
import NoiseInventory from "./components/NoiseInventory.vue";
import BoardPage from "./components/BoardPage.vue";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "noise-inventory",
      component: NoiseInventory
    },
    {
      path: "/board/:id",
      name: "board",
      component: BoardPage
    }
  ]
});

const routeMonitor = (to, from, next) => {
  if (to.name === "board") {
    const boardView = new CustomEvent("BOARD_VIEW", {
      detail: { boardId: to.params.id }
    });
    document.dispatchEvent(boardView);
  }
  next && next();
};
router.onReady((to, from, next) => {
  routeMonitor(to, from, next);
});
router.beforeEach(routeMonitor);

export default router;
