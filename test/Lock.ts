import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("TodoList", function () {
  let todoList;

  async function deployTodoList() {
    const TodoList = await ethers.getContractFactory("TodoList");
    todoList = await TodoList.deploy();
    //await todoList.deployed();

    return { todoList };
  }

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      const { todoList } = await loadFixture(deployTodoList);
      expect(todoList).to.exist;
    });
  });

  describe("createTodo", function () {
    it("Should create a new todo item", async function () {
      const { todoList } = await loadFixture(deployTodoList);
      await todoList.createTodo("Test Task", "Test Description");

      const todoItem = await todoList.tasks(0);
      expect(todoItem.task).to.equal("Test Task");
      expect(todoItem.description).to.equal("Test Description");
      expect(todoItem.isDone).to.equal(false);
    });
  });

  describe("getTodo", function () {
    it("Should return all todo items", async function () {
      const { todoList } = await loadFixture(deployTodoList);
      await todoList.createTodo("Test Task", "Test Description");
  
      const todoItems = await todoList.getTodo();
      expect(todoItems.length).to.equal(1);
      expect(todoItems[0].task).to.equal("Test Task");
      expect(todoItems[0].description).to.equal("Test Description");
      expect(todoItems[0].isDone).to.equal(false);
    });
  });
  
  describe("updateTodo", function () {
    it("Should update a todo item", async function () {
      const { todoList } = await loadFixture(deployTodoList);
      await todoList.createTodo("Test Task", "Test Description");
      await todoList.updateTodo(0, "Updated Task", "Updated Description");
  
      const updatedTodoItem = await todoList.tasks(0);
      expect(updatedTodoItem.task).to.equal("Updated Task");
      expect(updatedTodoItem.description).to.equal("Updated Description");
    });
  });
  
  describe("updateStatus", function () {
    it("Should update the status of a todo item", async function () {
      const { todoList } = await loadFixture(deployTodoList);
      await todoList.createTodo("Test Task", "Test Description");
      await todoList.updateStatus(0);
  
      const updatedTodoItem = await todoList.tasks(0);
      expect(updatedTodoItem.isDone).to.equal(true);
    });
  });
  
  // describe("deleteTodo", function () {
  //   it("Should delete a todo item", async function () {
  //     const { todoList } = await loadFixture(deployTodoList);
  //     await todoList.createTodo("Test Task", "Test Description");
  //     await todoList.deleteTodo(0);
  
  //     const todoItems = await todoList.getTodo();
  //     expect(todoItems.length).to.equal(0);
  //   });
  // });  
});
