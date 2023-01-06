import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import Quiz from "../../Quiz";
import { APP_TITLE } from "../../../helper/consts";
