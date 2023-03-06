import { Container, interfaces } from "inversify";
import { StorageManager } from './plugin/storage-manager';
import { PluginSystem } from "./plugin";
import { TYPES } from "./config";
import { SystemManager } from "./plugin/system-manager";
import { PluginLoader } from "./plugin/loader";
import { PluginFileManager } from "./plugin/plugin-file-manager";
import { IStorageManager, ISystemManager, IPluginSystem, IPluginLoader, IPluginFileManager, IEventBus, IShortcut, ICommandManager } from "./types";
import { EventBus } from "./plugin/event-bus";
import { CommandManager } from "./plugin/command-manager";
import { Shortcut } from "./plugin/shortcut";

const container = new Container();
container.bind<IStorageManager>(TYPES.StorageManager).to(StorageManager).inSingletonScope();
container.bind<interfaces.Provider<IStorageManager>>(TYPES.StorageManagerProvider).toProvider<IStorageManager>((context) => {
    return () => {
        return new Promise<IStorageManager>((resolve) => {
            const storageManger = context.container.get<IStorageManager>(TYPES.StorageManager);
            storageManger.initStorage().then(() => {
                resolve(storageManger);
            })
        })
    }
});
container.bind<ISystemManager>(TYPES.SystemManager).to(SystemManager).inSingletonScope();
container.bind<IPluginSystem>(TYPES.PluginSystem).to(PluginSystem).inSingletonScope();
container.bind<IPluginLoader>(TYPES.PluginLoader).to(PluginLoader).inSingletonScope();
container.bind<IPluginFileManager>(TYPES.PluginFileManager).to(PluginFileManager).inSingletonScope();
container.bind<IEventBus>(TYPES.EventBus).to(EventBus);
container.bind<IShortcut>(TYPES.Shortcut).to(Shortcut).inSingletonScope();
container.bind<ICommandManager>(TYPES.CommandManager).to(CommandManager).inSingletonScope();

export { container };