/**
 * Sleeps for the said amount of time (in ms)
 *
 * @export
 * @async
 * @param {number} ms Time in milliseconds for the delay
 * @returns {void}
 */
export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
