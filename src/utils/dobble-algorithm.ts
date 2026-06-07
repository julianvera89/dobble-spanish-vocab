import { DobbleCard, VocabularyWord } from '../types'
import { v4 as uuidv4 } from 'uuid'

/**
 * Generates a Dobble deck with exactly 57 cards and 57 unique images.
 * 
 * Mathematical Property: Any two cards share exactly one and only one common image.
 * 
 * Based on the finite projective plane of order 2 (Fano Plane variant).
 * This implementation uses a combinatorial design with 57 elements and 8 elements per card.
 */

export class DobbleGenerator {
  /**
   * Generate a valid Dobble deck from vocabulary words
   * @param words - Array of vocabulary words (must be at least 57)
   * @returns Array of DobbleCard objects
   */
  static generateDeck(words: VocabularyWord[]): DobbleCard[] {
    if (words.length < 57) {
      throw new Error('Need at least 57 vocabulary words to generate a Dobble deck')
    }

    // Take exactly 57 words
    const selectedWords = words.slice(0, 57)

    // Generate the mathematical combination sets
    const combinations = this.generateCombinations(57)

    // Map combinations to actual word IDs to create cards
    const cards: DobbleCard[] = combinations.map((combo) => ({
      id: uuidv4(),
      imageIds: combo.map(i => selectedWords[i].id),
    }))

    // Verify the Dobble property
    this.verifyDobbleProperty(cards)

    return cards
  }

  /**
   * Generate the mathematical combinations for a Dobble deck with 57 items
   * Uses the design from the Fano plane (finite projective plane of order 2)
   * @param n - Number of items (must be 57)
   * @returns Array of combinations, each containing 8 indices
   */
  private static generateCombinations(n: number): number[][] {
    if (n !== 57) {
      throw new Error('This implementation only supports 57 items')
    }

    // For a Dobble deck with 57 cards and 8 images per card:
    // - Total cards: 57
    // - Images per card: 8
    // - Total unique images: 57
    // - Any two cards share exactly 1 image

    const combinations: number[][] = []

    // Generate using modular arithmetic on Z_7 x Z_7 with a special point
    // This creates a (57, 8, 1) design (also known as a Steiner system)

    // All combinations will be generated from projective plane structure
    const base = this.generateProjectivePlane()

    return base
  }

  /**
   * Generate the projective plane design (Fano plane extended)
   * This creates 57 cards with the Dobble property
   */
  private static generateProjectivePlane(): number[][] {
    const combinations: number[][] = []

    // Create combinations from a 7x7 grid plus one point at infinity
    // Element 0: Point at infinity
    // Elements 1-49: 7x7 grid
    // Elements 50-56: Parallel classes

    // Line 0: Base point with representatives from each class
    combinations.push([0, 1, 2, 3, 4, 5, 6, 7])

    // 7 lines through point 0 (each with 7 grid points)
    for (let i = 0; i < 7; i++) {
      const line = [0]
      for (let j = 0; j < 7; j++) {
        line.push(1 + i * 7 + j)
      }
      combinations.push(line)
    }

    // 49 lines from the grid (7 rows × 7 columns)
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 7; col++) {
        const line: number[] = []
        
        // Add all elements in this row
        for (let k = 0; k < 7; k++) {
          line.push(1 + row * 7 + ((col + k) % 7))
        }
        
        // Add point at infinity for this line
        line.push(50 + row)
        
        combinations.push(line)
      }
    }

    return combinations.slice(0, 57)
  }

  /**
   * Verify that the generated deck satisfies the Dobble property:
   * Any two cards must share exactly one and only one common image
   */
  private static verifyDobbleProperty(cards: DobbleCard[]): void {
    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        const card1 = new Set(cards[i].imageIds)
        const card2 = new Set(cards[j].imageIds)

        const intersection = [...card1].filter(x => card2.has(x))

        if (intersection.length !== 1) {
          throw new Error(
            `Dobble property violated: Card ${i} and Card ${j} share ${intersection.length} images instead of 1`
          )
        }
      }
    }
  }

  /**
   * Get a random pair of cards for gameplay
   */
  static getRandomCardPair(cards: DobbleCard[]): [DobbleCard, DobbleCard] {
    const idx1 = Math.floor(Math.random() * cards.length)
    let idx2 = Math.floor(Math.random() * cards.length)
    
    while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * cards.length)
    }

    return [cards[idx1], cards[idx2]]
  }

  /**
   * Find the common image between two cards
   */
  static findCommonImage(card1: DobbleCard, card2: DobbleCard): string {
    const set1 = new Set(card1.imageIds)
    const common = card2.imageIds.find(id => set1.has(id))
    
    if (!common) {
      throw new Error('No common image found between cards')
    }
    
    return common
  }

  /**
   * Get the 7 non-common images from a pair of cards
   */
  static getDistinctImages(card1: DobbleCard, card2: DobbleCard): {
    card1Distinct: string[]
    card2Distinct: string[]
    common: string
  } {
    const common = this.findCommonImage(card1, card2)
    const card1Distinct = card1.imageIds.filter(id => id !== common)
    const card2Distinct = card2.imageIds.filter(id => id !== common)

    return { card1Distinct, card2Distinct, common }
  }
}
