import { useMemo, useState } from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import RoadmapInsightPanel from '../components/roadmap/RoadmapInsightPanel.jsx'
import RoadmapProgressSummary from '../components/roadmap/RoadmapProgressSummary.jsx'
import RoadmapStageChecklistCard from '../components/roadmap/RoadmapStageChecklistCard.jsx'
import RoadmapTimeline from '../components/roadmap/RoadmapTimeline.jsx'
import {
  dashboardSidebarItems,
  dashboardUserProfile,
} from '../data/dashboardData.js'
import {
  defaultRoadmapStageId,
  roadmapBusinessProfile,
  roadmapStages,
  roadmapStageDetails,
} from '../data/roadmapData.js'

function createInitialStageState() {
  return Object.fromEntries(
    Object.entries(roadmapStageDetails).map(([stageId, detail]) => [
      stageId,
      {
        ...detail,
        tasks: detail.tasks.map((task) => ({ ...task })),
      },
    ]),
  )
}

function RoadmapPage() {
  const [selectedStageId, setSelectedStageId] = useState(defaultRoadmapStageId)
  const [stageState, setStageState] = useState(createInitialStageState)

  const sidebar = (
    <DashboardSidebar
      items={dashboardSidebarItems}
      userProfile={dashboardUserProfile}
    />
  )

  const topbar = (
    <DashboardTopbar
      title="Roadmap Bisnis"
      subtitle="Panduan langkah demi langkah untuk membantu UMKM mengembangkan bisnisnya."
    />
  )

  const selectedStage = useMemo(
    () => stageState[selectedStageId] ?? stageState[defaultRoadmapStageId],
    [selectedStageId, stageState],
  )

  const selectedStageIndex = roadmapStages.findIndex((stage) => stage.id === selectedStageId)
  const safeStageIndex = selectedStageIndex >= 0 ? selectedStageIndex : 0
  const isSelectedStageComplete = selectedStage.tasks.every((task) => task.completed)

  const maxUnlockedStageIndex = useMemo(() => {
    let unlockedIndex = 0

    for (let index = 0; index < roadmapStages.length - 1; index += 1) {
      const stageId = roadmapStages[index].id
      const stageTasks = stageState[stageId]?.tasks ?? []
      const isStageComplete = stageTasks.every((task) => task.completed)

      if (!isStageComplete) {
        break
      }

      unlockedIndex = index + 1
    }

    return unlockedIndex
  }, [stageState])

  const canGoToPreviousStage = safeStageIndex > 0
  const canGoToNextStage = safeStageIndex < roadmapStages.length - 1


  const progressSummary = useMemo(() => {
    const stageEntries = roadmapStages.map((stage) => ({
      ...stage,
      tasks: stageState[stage.id]?.tasks ?? [],
    }))

    const totalTasks = stageEntries.reduce((sum, stage) => sum + stage.tasks.length, 0)
    const completedTasks = stageEntries.reduce(
      (sum, stage) => sum + stage.tasks.filter((task) => task.completed).length,
      0,
    )
    const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    const currentProgressIndex = stageEntries.findIndex(
      (stage) => !stage.tasks.every((task) => task.completed),
    )
    const activeIndex = currentProgressIndex === -1 ? stageEntries.length - 1 : currentProgressIndex
    const activeStage = stageEntries[activeIndex] ?? stageEntries[0]
    const nextStage = stageEntries[activeIndex + 1]
    const isAllComplete = currentProgressIndex === -1
    const isActiveStageComplete = activeStage?.tasks?.every((task) => task.completed) ?? false

    if (isAllComplete) {
      return {
        title: 'Progress Bisnis',
        percent: 100,
        statusLabel: 'Selesai',
        description:
          'Semua tahap roadmap bisnis sudah selesai. Bisnis Anda siap masuk ke fase pengembangan berikutnya.',
      }
    }

    if (isActiveStageComplete && nextStage) {
      return {
        title: 'Progress Bisnis',
        percent,
        statusLabel: 'Siap Lanjut',
        description: `Tahap ${activeStage.title} sudah selesai. Anda siap lanjut ke tahap ${nextStage.title}.`,
      }
    }

    return {
      title: 'Progress Bisnis',
      percent,
      statusLabel: 'Sedang Berjalan',
      description: `Anda sedang berada di tahap ${activeStage.title}. Selesaikan semua checklist untuk membuka tahap berikutnya.`,
    }
  }, [stageState])

  const displayStages = useMemo(
    () =>
      roadmapStages.map((stage, index) => {
        const isStageComplete = (stageState[stage.id]?.tasks ?? []).every(
          (task) => task.completed,
        )
        const isUnlocked = index <= maxUnlockedStageIndex

        if (index === safeStageIndex) {
          return {
            ...stage,
            status: 'active',
            statusLabel: isSelectedStageComplete ? 'Siap Lanjut' : 'Sedang Berjalan',
            isDisabled: false,
          }
        }

        if (!isUnlocked) {
          return {
            ...stage,
            status: 'locked',
            statusLabel: 'Terkunci',
            isDisabled: true,
          }
        }

        return {
          ...stage,
          status: isStageComplete ? 'completed' : 'active',
          statusLabel: isStageComplete ? 'Selesai' : 'Tersedia',
          isDisabled: false,
        }
      }),
    [isSelectedStageComplete, maxUnlockedStageIndex, safeStageIndex, stageState],
  )

  function handleToggleTask(taskId) {
    setStageState((currentState) => {
      const currentStage = currentState[selectedStageId]

      if (!currentStage) {
        return currentState
      }

      return {
        ...currentState,
        [selectedStageId]: {
          ...currentStage,
          tasks: currentStage.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          ),
        },
      }
    })
  }

  function handleSelectStage(stageId) {
    const targetIndex = roadmapStages.findIndex((stage) => stage.id === stageId)

    if (targetIndex === -1 || targetIndex > maxUnlockedStageIndex) {
      return
    }

    setSelectedStageId(stageId)
  }

  function handleGoToPreviousStage() {
    if (!canGoToPreviousStage) {
      return
    }

    setSelectedStageId(roadmapStages[safeStageIndex - 1].id)
  }

  function handleGoToNextStage() {
    if (!canGoToNextStage || !isSelectedStageComplete) {
      return
    }

    setSelectedStageId(roadmapStages[safeStageIndex + 1].id)
  }

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <div className="app-page-stack">
        <RoadmapProgressSummary
          businessProfile={roadmapBusinessProfile}
          progress={progressSummary}
        />

        <RoadmapTimeline
          stages={displayStages}
          selectedStageId={selectedStageId}
          onSelectStage={handleSelectStage}
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
          <RoadmapStageChecklistCard
            stage={selectedStage}
            onToggleTask={handleToggleTask}
            onGoToPreviousStage={handleGoToPreviousStage}
            onGoToNextStage={handleGoToNextStage}
            canGoToPreviousStage={canGoToPreviousStage}
            canGoToNextStage={canGoToNextStage}
            isStageComplete={isSelectedStageComplete}
          />
          <RoadmapInsightPanel summary={selectedStage.summary} />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default RoadmapPage




