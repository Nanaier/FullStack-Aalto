import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import blogService from "../services/blogs";

jest.mock("../services/blogs");

describe("<Blog />", () => {
  let container;
  let mockHandler;
  const blog = {
    id: "987654321",
    title: "test title",
    author: "Anastasiia",
    url: "www.testurl.com",
    likes: 777,
    user: {
      id: "123456789",
      name: "Anastasiia",
      username: "Nanaier",
    },
  };
  beforeEach(() => {
    mockHandler = jest.fn();
    container = render(<Blog blog={blog} handleUpdate={mockHandler} />);
  });

  test("renders content", () => {
    const title = container.container.querySelector(".title");
    expect(title).toHaveTextContent(blog.title);

    const author = container.container.querySelector(".author");
    expect(author).toHaveTextContent(blog.author);
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.container.querySelector(".hiddenInfo");
    expect(div).not.toHaveStyle("display: none");
    const url = container.container.querySelector(".url");
    expect(url).toHaveTextContent(blog.url);
    const likes = container.container.querySelector(".likes");
    expect(likes).toHaveTextContent(blog.likes);
  });
  test("clicking the button twice calls event handler twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("like");
    await user.click(button);
    await user.click(button);

    expect(blogService.update).toHaveBeenCalledTimes(2);
  });
});
