import { Plus } from 'lucide-react'
import { OutlineButton } from './ui'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createGoalCompletion, getPendingGoals } from '../http'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60, // 60 seconds
  })

  if (!data) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        const disableButton =
          goal.completionCount >= goal.desiredWeeklyFrequency
        return (
          <OutlineButton
            key={goal.id}
            disabled={disableButton}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
