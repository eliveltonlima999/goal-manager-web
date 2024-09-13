import { CreateGoal, Dialog, EmptyGoals, Summary } from './components'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http'

export function App() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })

  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  )
}
