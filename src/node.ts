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
    const nodeQueue: Array<Node<T>> = [this];
    const seenNodes: Set<Node<T>> = new Set<Node<T>>();

    // Recursively search connected nodes (breadth-first-traversal)
    while (nodeQueue.length) {
      // Get next node in queue
      const searchNode = nodeQueue.shift();
      if (seenNodes.has(searchNode)) continue;

      // Mark as seen
      seenNodes.add(searchNode);

      // Enqueue children
      nodeQueue.push(...searchNode.nodes);

      // Search recursively
      return searchNode.isConnectedTo(node, depth - 1);
    }

    // Not found
    return false;
  }
}
