// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TodoList {
    struct TodoItem {
        string task;
        string description;
        bool isDone;
    }

    TodoItem[] public tasks;

    function createTodo(
        string memory _task,
        string memory _description
    ) external {
        TodoItem memory todo;
        todo.task = _task;
        todo.description = _description;
        tasks.push(todo);
    }
}
