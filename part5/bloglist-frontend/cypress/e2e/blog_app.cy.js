describe("Blog app", function () {
  const user = {
    username: "testuser",
    name: "Test User",
    password: "testpassword",
  };
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "Nanaier",
      name: "Anastasiia",
      password: "1234",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.get("input[name='Username']").should("exist");
    cy.get("input[name='Password']").should("exist");
    cy.contains("login").should("exist");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input[name='Username']").type(user.username);
      cy.get("input[name='Password']").type(user.password);
      cy.get("button[type='submit']").click();

      // Verify that the login is successful
      cy.contains("User Test User logged in!");
    });

    it("fails with wrong credentials", function () {
      cy.get("input[name='Username']").type("wronguser");
      cy.get("input[name='Password']").type("wrong password");
      cy.get("button[type='submit']").click();

      // Verify that the login is successful
      cy.contains("Wrong credentials");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: user.username,
        password: user.password,
      });
      cy.get("input[name='Username']").type(user.username);
      cy.get("input[name='Password']").type(user.password);
      cy.get("button[type='submit']").click();
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("input[name='Title']").type("Test Blog");
      cy.get("input[name='Author']").type("Test Author");
      cy.get("input[name='Url']").type("https://example.com");
      cy.get("button[type='submit']").contains("create").click();

      cy.contains("Blog Test Blog by Test Author added!");
    });
    it("A blog can be liked", function () {
      cy.contains("new blog").click();

      cy.get("input[name='Title']").type("Test Blog");
      cy.get("input[name='Author']").type("Test Author");
      cy.get("input[name='Url']").type("https://example.com");
      cy.get("button[type='submit']").contains("create").click();
      cy.contains("view").click();

      // Like the blog
      cy.contains("Test Blog Test Author")
        .parent()
        .find(".likesButton")
        .click();

      // Check that the likes count has increased
      cy.contains("Test Blog Test Author").parent().contains("1");
    });
    it("A blog can be deleted by the user who created it", function () {
      cy.contains("new blog").click();

      cy.get("input[name='Title']").type("Test Blog");
      cy.get("input[name='Author']").type("Test Author");
      cy.get("input[name='Url']").type("https://example.com");
      cy.get("button[type='submit']").contains("create").click();
      cy.contains("view").click();
      // Delete the blog
      cy.contains("Test Blog Test Author")
        .parent()
        .find("button")
        .contains("delete")
        .click();

      // Confirm the deletion
      cy.on("window:confirm", () => true);

      // Verify that the blog is no longer visible
      cy.contains("Test Blog Test Author").should("not.exist");
    });
    it("Only the creator can see the delete button of a blog", function () {
      cy.contains("new blog").click();

      cy.get("input[name='Title']").type("Test Blog");
      cy.get("input[name='Author']").type("Test Author");
      cy.get("input[name='Url']").type("https://example.com");
      cy.get("button[type='submit']").contains("create").click();

      // Logout the current user
      cy.contains("logout").click();

      cy.request("POST", "http://localhost:3003/api/login", {
        username: "Nanaier",
        password: "1234",
      });
      cy.get("input[name='Username']").type("Nanaier");
      cy.get("input[name='Password']").type("1234");
      cy.get("button[type='submit']").click();
      cy.contains("view").click();

      // Verify that the delete button is not visible
      cy.contains("Test Blog Test Author")
        .parent()
        .find("button")
        .contains("delete")
        .should("not.exist");
    });

    it("Blogs are ordered according to likes", function () {
      cy.contains("new blog").click();

      cy.get("input[name='Title']").type("Blog 1");
      cy.get("input[name='Author']").type("Author 1");
      cy.get("input[name='Url']").type("https://example.com");
      cy.get("button[type='submit']").contains("create").click();

      cy.get("input[name='Title']").type("Blog 2");
      cy.get("input[name='Author']").type("Author 2");
      cy.get("input[name='Url']").type("https://example.com");
      cy.get("button[type='submit']").contains("create").click();

      cy.get("input[name='Title']").type("Blog 3");
      cy.get("input[name='Author']").type("Author 3");
      cy.get("input[name='Url']").type("https://example.com");
      cy.get("button[type='submit']").contains("create").click();

      cy.contains("view").click();
      // Like the blogs in a specific order
      cy.contains("Blog 1 Author 1")
        .parent()
        .find(".likesButton")
        .as("likeButton1");
      cy.contains("view").click();
      cy.contains("Blog 2 Author 2")
        .parent()
        .find(".likesButton")
        .as("likeButton2");
      cy.contains("view").click();
      cy.contains("Blog 3 Author 3")
        .parent()
        .find(".likesButton")
        .as("likeButton3");

      cy.get("@likeButton3").click();
      cy.wait(500); // Wait for the likes to update

      cy.get("@likeButton2").click();
      cy.wait(500); // Wait for the likes to update

      cy.get("@likeButton1").click();
      cy.wait(500); // Wait for the likes to update
      cy.get("@likeButton1").click();
      cy.wait(500); // Wait for the likes to update

      // Verify the order of blogs according to likes
      cy.get(".blog").eq(0).should("contain", "Blog 1 Author 1");
      cy.get(".blog").eq(1).should("contain", "Blog 2 Author 2");
      cy.get(".blog").eq(2).should("contain", "Blog 3 Author 3");
    });
  });
});
