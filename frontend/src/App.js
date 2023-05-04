import { ThemeProvider, createGlobalStyle } from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import StyledButton, {
  FancyButton,
  SubmitButton,
  DarkButton
} from "./components/Button/Button";
import { AnimatedLogo } from "./components/Button/Button.styles";

const theme = {
  dark: {
    primary: "#000",
    text: "#fff",
  },
  light: {
    primary: "#fff",
    text: "#000",
  },
};

const GlobalStyle = createGlobalStyle`
  button{
    font-family: 'Roboto'
  }
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <div className="App">
        <AnimatedLogo src={logo} />
        <StyledButton>StyledButton</StyledButton>
        <hr />
        <StyledButton variant="outline">StyledButton</StyledButton>
        <hr />
        <FancyButton as="a">Fancy</FancyButton>
        <hr />
        <SubmitButton as="a">Submit</SubmitButton>
        <hr/>
        <DarkButton>DarkButton</DarkButton>
      </div>
    </ThemeProvider>
  );
}

export default App;
