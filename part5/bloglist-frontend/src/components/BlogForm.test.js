import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { BlogForm } from "./BlogForm";

describe("<BlogForm />", () => {
  test("calls the event handler with the right details when a new blog is created", () => {
    const createBlogMock = jest.fn();

    render(<BlogForm createBlog={createBlogMock} />);

    const titleInput = screen.getByLabelText("title:");
    const authorInput = screen.getByLabelText("author:");
    const urlInput = screen.getByLabelText("url:");
    const createButton = screen.getByText("create");

    const newBlog = {
      title: "Test Title",
      author: "Test Author",
      url: "www.testurl.com",
    };

    fireEvent.change(titleInput, { target: { value: newBlog.title } });
    fireEvent.change(authorInput, { target: { value: newBlog.author } });
    fireEvent.change(urlInput, { target: { value: newBlog.url } });
    fireEvent.click(createButton);

    expect(createBlogMock).toHaveBeenCalledTimes(1);
    expect(createBlogMock).toHaveBeenCalledWith(newBlog);
  });
});
