import { Graph } from './graph';

interface IUser {
  id: number;
  name: string;
  job: string;
}

// Sample users
const users: IUser[] = [
  { id: 1, name: 'Kyle', job: 'Carpenter' },
  { id: 2, name: 'Sally', job: 'Blacksmith' },
  { id: 3, name: 'Bob', job: 'Fletcher' },
  { id: 4, name: 'Jane', job: 'Cobbler' },
  { id: 5, name: 'George', job: 'Blacksmith' },
  { id: 6, name: 'Janet', job: 'Clothier' },
];

test('nodes are added to the graph', () => {
  const graph = new Graph<number, IUser>();
  users.forEach((user, i) => graph.add(i, user));
  expect(graph.get(0).value).toBe(users[0]);
  expect(graph.get(1).value).toBe(users[1]);
  expect(graph.get(2).value).toBe(users[2]);
});

test('nodes are connected', () => {
  const graph = new Graph<number, IUser>();
  users.forEach((user, i) => graph.add(i, user));
  expect(graph.get(0).isConnectedTo(graph.get(1))).toBe(false);
  graph.get(0).connect(graph.get(1));
  expect(graph.get(0).isConnectedTo(graph.get(1))).toBe(true);
});

test('nodes are disconnected', () => {
  const graph = new Graph<number, IUser>();
  users.forEach((user, i) => graph.add(i, user));
  graph.get(0).connect(graph.get(1));
  expect(graph.get(0).isConnectedTo(graph.get(1))).toBe(true);
  graph.get(0).disconnect(graph.get(1));
  expect(graph.get(0).isConnectedTo(graph.get(1))).toBe(false);
});

test('error is thrown when connecting to self', () => {
  const graph = new Graph<number, IUser>();
  users.forEach((user, i) => graph.add(i, user));
  expect(() => graph.get(0).connect(graph.get(0))).toThrowError();
});

test('nodes are disconnected on delete', () => {
  const graph = new Graph<number, IUser>();
  users.forEach((user, i) => graph.add(i, user));
  graph.get(0).connect(graph.get(1));
  graph.get(1).connect(graph.get(0));
  graph.remove(1);
  expect(graph.get(1)).toBeUndefined();
  expect(graph.get(0).isConnectedTo(graph.get(1))).toBe(false);
});

test('nodes are connected at depth', () => {
  const graph = new Graph<number, IUser>();
  users.forEach((user, i) => graph.add(i, user));
  expect(graph.get(0).isConnectedTo(graph.get(1), 3)).toBe(false);
  graph.get(0).connect(graph.get(1));
  graph.get(1).connect(graph.get(2));
  graph.get(2).connect(graph.get(3));
  graph.get(3).connect(graph.get(4));
  graph.get(4).connect(graph.get(5));
  expect(graph.get(0).isConnectedTo(graph.get(2), 2)).toBe(true);
});
