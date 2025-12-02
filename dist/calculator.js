"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cruxPerhourHolder = document.getElementById("cruxPerHour");
const motesPerhourHolder = document.getElementById("motesPerHour");
const output = document.getElementById("output");
// how to do the calculation
// take the crux per hour divide by 16 and multiply by 4000 to get motes spent per hour
// take motes per hour and see how long it would take to get that many motes.
// subtract that time from an hour to get total time shadow farming.
// divide the time from hour by an hour and multiply that by the amount of crux per hour.
// profit is that much crux per hour(crux / 16 * 3) / 16 * api t5 reflection price.
function CalculateProfit() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Calculating Profit...");
        const cruxPerHour = Number(cruxPerhourHolder.value);
        const motesPerHour = Number(motesPerhourHolder.value);
        let motesSpentPerhour = (cruxPerHour / 16) * 4000;
        let timeToGetMotes = motesSpentPerhour / motesPerHour;
        let shadowFarmingTime = 60 - timeToGetMotes;
        let effectiveCruxPerHour = (shadowFarmingTime / 60) * cruxPerHour;
        const response = yield fetch("https://api.hypixel.net/skyblock/bazaar");
        if (!response.ok) {
            console.error("Failed to fetch bazaar data");
            return;
        }
        const data = yield response.json();
        const t5ReflectionPrice = data.products["ENCHANTMENT_REFLECTION_5"].quick_status.sellPrice;
        let totalProfit = (effectiveCruxPerHour / 16 * 3) / 16 * t5ReflectionPrice;
        output.textContent = "Estimated Profit: " + Math.round(totalProfit).toString() + " coins per hour";
    });
}
window.CalculateProfit = CalculateProfit;
// idk why this isnt working the whole thing i mean.
