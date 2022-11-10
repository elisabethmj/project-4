import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "./NavBar.js";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

let mockAxios = new MockAdapter(axios)



const user = {
    firstname: "Elise",
    surname: "James"
}

test("test if navbar renders correctly", () => {
    render(<NavBar />)
    const navBar = screen.getByTestId("navBar")

    expect(navBar).toBeInTheDocument()
});

test("test that correct links displayed when logged out", () => {
    render(<NavBar loggedIn={false}/>)
    const hamburger = screen.getByTestId("hamburger")
    const about = screen.getByTestId("about")
    const login = screen.getByTestId("login")
    
    expect(hamburger).toBeInTheDocument()
    expect(login).toBeInTheDocument()
    expect(about).toBeInTheDocument()
})


test("test that correct links displayed when logged in", () => {
    
    render(<NavBar loggedIn={true} user={user}/>)
    const logout = screen.getByTestId("logout")
  
    const home = screen.getByTestId("home")
    const username = screen.getByTestId("username")
    
    expect(logout).toBeInTheDocument()
    expect(home).toBeInTheDocument()
 
    expect(username).toBeInTheDocument()

})

test("test that correct user firstname displaying when logged in", () => {
    render(<NavBar loggedIn={true} user={user}/>)
    const username = screen.getByTestId("username")

    expect(username).toBeInTheDocument()
    expect(username.textContent).toBe("Elise")
})

test("test logout works if logged in", async () => {
    mockAxios.onDelete().reply(200)

    const {rerender} = render(<NavBar loggedIn={true} user={user}/>)
    const logout = screen.getByTestId("logout")
    const username = screen.getByTestId("username")

    expect(logout).toBeInTheDocument()
    await act(() => fireEvent.click(logout)) 

    // expect(mockAxios).toBe()
    rerender(<NavBar loggedIn={false} user={user}/>)
    expect(username).not.toBeInTheDocument()
})