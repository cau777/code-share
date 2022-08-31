import {Command} from "../CodeEditorTypes";
import {SelectAllCommand} from "./SelectAllCommand";
import {DeleteToWordStart} from "./DeleteToWordStart";
import {EnterCommand} from "./EnterCommand";
import {InsertIndentationCommand} from "./InsertIndentationCommand";
import {MoveLineUpCommand} from "./MoveLineUpCommand";
import {MoveLineDownCommand} from "./MoveLineDownCommand";
import {BackspaceCommand} from "./BackspaceCommand";
import {DeleteCommand} from "./DeleteCommand";
import {InsertKeyCommand} from "./InsertKeyCommand";

const Commands: Command[] = [
    SelectAllCommand,
    DeleteToWordStart,
    EnterCommand,
    InsertIndentationCommand,
    MoveLineUpCommand,
    MoveLineDownCommand,
    BackspaceCommand,
    DeleteCommand,
    InsertKeyCommand,
];

export default Commands;