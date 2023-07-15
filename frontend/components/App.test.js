// Write your tests here
import React from 'react'
import AppFunctional from './AppFunctional';
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';

beforeEach(() => {
  render(<AppFunctional />);
});

test('sanity', () => {
  expect(true).toBe(true)
})

test("UI'te, henüz herhangi bir click event olmadığında, '0 kere ilerlediniz' yazıyor mu?", async () => {
  expect(screen.getByText("0 kere ilerlediniz"));
});

test("UI'te, henüz herhangi bir click event olmadığında, koordinatlar (2,2) mi?", async () => {
  expect(screen.getByText("Koordinatlar (2,2)"));
});

test("Bir defa sol, bir defa yukarıya tıklandığında koordinatlar doğru yazılıyor mu?", async () => {
  fireEvent.click(document.querySelector('#left'));
  fireEvent.click(document.querySelector('#up'));
  expect(screen.getByText("Koordinatlar (1,1)"));
});

test("İki defa aşağı tıklandığında bir hata kodu geliyor mu (Aşağıya gidemezsiniz)?", async () => {
  fireEvent.click(document.querySelector('#down'));
  fireEvent.click(document.querySelector('#down'));
  expect(screen.getByText("Aşağıya gidemezsiniz"));
});

test("Hareket sayısı doğru sayılıyor ve ekrana doğru yansıtılıyor mu?", async () => {
  fireEvent.click(document.querySelector('#down'));
  fireEvent.click(document.querySelector('#left'));
  fireEvent.click(document.querySelector('#up'));
  fireEvent.click(document.querySelector('#up'));
  fireEvent.click(document.querySelector('#right'));
  fireEvent.click(document.querySelector('#right'));
  fireEvent.click(document.querySelector('#down'));
  fireEvent.click(document.querySelector('#down'));
  fireEvent.click(document.querySelector('#left'));
  fireEvent.click(document.querySelector('#down'));
  fireEvent.click(document.querySelector('#down'));
  fireEvent.click(document.querySelector('#down'));
  fireEvent.click(document.querySelector('#up'));
  fireEvent.click(document.querySelector('#up'));
  expect(screen.getByText("11 kere ilerlediniz"));
});
