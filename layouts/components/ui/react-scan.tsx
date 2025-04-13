import { useEffect } from "react"
import { scan } from "react-scan"

/**
 * React Scan
 */
export function ReactScan() {
	useEffect(() => {
		scan({
			enabled: true,
		})
	}, [])

	return <></>
}
