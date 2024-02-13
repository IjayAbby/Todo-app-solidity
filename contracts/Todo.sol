// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TodoList {


    struct TodoItem {
        string task;
        string description;
        bool isDone;
    }

    TodoItem[] public tasks;
}