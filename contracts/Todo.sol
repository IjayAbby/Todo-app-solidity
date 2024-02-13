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

    function getTodo() external view returns (TodoItem[] memory) {
        return tasks;
    }

    function updateTodo(
        uint _index,
        string memory _task,
        string memory _description
    ) public {
        TodoItem storage todo = tasks[_index];
        todo.task = _task;
        todo.description = _description;
    }

    function updateStatus(uint _index) public {
        TodoItem storage todo = tasks[_index];
        todo.isDone = !todo.isDone;
    }

    function deleteTodo(uint _index) external {
        delete tasks[_index];
    }
}
