
import { Page, pm } from "./Page.js";

import { World } from "../../World/World.js";
import { WorldRenderer } from "../../Renderer/WorldRenderer.js";

const sleep = ms => new Promise(s => window.setTimeout(s, ms));

class LoadTerrainPage extends Page {
    static get outdegree() { return ["play", ]; };
    async onTransitionedToThis(from, eventName, fromPage, ...data) {
        let p = this.shadowRoot.getElementById("gen-out");
        p.innerHTML = "加载地形中";
        await sleep(70);
        let world = new World({ ...(data[0] || {}) });
        p.innerHTML = "准备渲染";
        await sleep(70);
        let canvas = pm.getPageByID("play").mainCanvas;
        let renderer = new WorldRenderer(canvas, world);
        pm.dispatchEvent("load-terrain.loaded", {world, renderer});
        this.close({world, renderer});
    };
}

LoadTerrainPage.asyncLoadAndDefine();


export {
    LoadTerrainPage,
};
