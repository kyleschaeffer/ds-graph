import { Node } from './node';

/**
 * Simple implementation of the graph data structure
 *  - Like a tree, with peer-to-peer connections
 *  - Bidirectional implementation
 *  - Use breadth-first-traversal to iterate
 */
export class Graph<K, V> {
  /**
   * Nodes in the graph
   */
  private nodes: Map<K, Node<V>>;

  /**
   * Instantiate a new graph
   */
  constructor() {
    // New empty nodes map
    this.nodes = new Map<K, Node<V>>();
  }

  /**
   * Add a node to the graph
   */
  public add(key: K, value: V): void {
    this.nodes.set(key, new Node<V>(value));
  }

  /**
   * Get a node from the graph by key
   */
  public get(key: K): Node<V> {
    return this.nodes.get(key);
  }

  /**
   * Remove a node from the graph
   */
  public remove(key: K): void {
    // Get deleting node
    const deletingNode = this.get(key);
    if (!deletingNode) throw new Error(`Key ${key} not found`);

    // Remove all connections to deleting node
    this.nodes.forEach(node => {
      if (node.isConnectedTo(deletingNode)) node.disconnect(deletingNode);
    });

    // Delete node
    this.nodes.delete(key);
  }
}
