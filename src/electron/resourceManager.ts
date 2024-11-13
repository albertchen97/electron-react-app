import osUtils from "os-utils";
import fs from "fs";
import os from "os";

const POLL_INTERVAL = 500;

function getCpuUsage() {
    // return a promise with the CPU usage percentage from "osUtils.cpuUsage" as the resolve value
    return new Promise((resolve) => {
        osUtils.cpuUsage(resolve);
    });
}

function getMemoryUsage() {
    return 1 - osUtils.freememPercentage();
}

function getStorageData() {
    const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;
    return {
        // total storage in GB
        total: Math.floor(total / 1_000_000_000),
        // storage usage in GB
        usage: 1 - free / total,
    };
}

function getStaticData() {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model;
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

    return {
        totalStorage,
        cpuModel,
        totalMemoryGB,
    };
}

export function pollResources() {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const memoryUsage = getMemoryUsage();
        const storageData = getStorageData();

        console.log({ cpuUsage, memoryUsage, storageUsage: storageData.usage });
    }, POLL_INTERVAL);
}
