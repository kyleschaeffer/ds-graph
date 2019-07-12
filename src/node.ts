/**
 * Graph node
 */
export class Node<T> {
  /**
   * Node value
   */
  public value: T;

  /**
   * Connected peer nodes
   */
  private nodes: Set<Node<T>>;

  /**
   * Instantiate a new node
   */
  constructor(value: T) {
    this.value = value;
    this.nodes = new Set<Node<T>>();
  }

  /**
   * Connect to a node in the graph
   */
  public connect(node: Node<T>): void {
    // Don't connect to self
    if (node === this) throw new Error('Can’t connect to self');

    this.nodes.add(node);
  }

  /**
   * Disconnect from a node in the graph
   */
  public disconnect(node: Node<T>): void {
    this.nodes.delete(node);
  }

  /**
   * Determine if given node is connected in the graph within given depth
   */
  public isConnectedTo(node: Node<T>, depth: number = 1): boolean {
    // Flat search
    if (depth <= 1) return this.nodes.has(node);

    // Build a node queue and track seen nodes
    let nodeQueue: Array<Node<T>> = [this];
    const seenNodes: Set<Node<T>> = new Set<Node<T>>();

    // Search connected nodes (breadth-first-traversal)
    let currentDepth: number = 0;
    while (nodeQueue.length && currentDepth < depth) {
      // Queue up nodes for iteration at next depth level
      const nextNodeQueue: Array<Node<T>> = [];

      // Search nodes in queue
      for (const searchNode of nodeQueue) {
        // Found a match
        if (searchNode.isConnectedTo(node)) return true;

        // Already seen/mark as seen
        if (seenNodes.has(searchNode)) continue;
        seenNodes.add(searchNode);

        // Enqueue children
        nextNodeQueue.push(...searchNode.nodes);
      }

      // Increase depth
      nodeQueue = nextNodeQueue;
      currentDepth++;
    }

    // Not found
    return false;
  }
}
