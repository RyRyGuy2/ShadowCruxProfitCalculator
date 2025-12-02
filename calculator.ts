const cruxPerhourHolder = document.getElementById("cruxPerHour") as HTMLInputElement;
const motesPerhourHolder = document.getElementById("motesPerHour") as HTMLInputElement;
const output = document.getElementById("output") as HTMLHeadingElement;

// how to do the calculation
// take the crux per hour divide by 16 and multiply by 4000 to get motes spent per hour
// take motes per hour and see how long it would take to get that many motes.
// subtract that time from an hour to get total time shadow farming.
// divide the time from hour by an hour and multiply that by the amount of crux per hour.
// profit is that much crux per hour(crux / 16 * 3) / 16 * api t5 reflection price.

async function CalculateProfit() {
    console.log("Calculating Profit...");
    const cruxPerHour: number = Number(cruxPerhourHolder.value);
    const motesPerHour: number = Number(motesPerhourHolder.value);
    let motesSpentPerhour:number = (cruxPerHour / 16) * 4000;
    let timeToGetMotes: number = motesSpentPerhour / motesPerHour;
    let shadowFarmingTime: number = 60 - timeToGetMotes;
    let effectiveCruxPerHour: number = (shadowFarmingTime / 60) * cruxPerHour;

    const response = await fetch("https://api.hypixel.net/skyblock/bazaar")

    if (!response.ok) {
        console.error("Failed to fetch bazaar data");
        return;
    }

    const data = await response.json();
    const t5ReflectionPrice: number = data.products["ENCHANTMENT_REFLECTION_5"].quick_status.sellPrice;

    let totalProfit: number = (effectiveCruxPerHour / 16 * 3) / 16 * t5ReflectionPrice;
    output.textContent = "Estimated Profit: " + Math.round(totalProfit).toString() + " coins per hour";



}
(window as any).CalculateProfit = CalculateProfit;
// idk why this isnt working the whole thing i mean.
