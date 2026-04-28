import { Clock, Trash2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import Surface from '../../components/ui/Surface'

const statusLabels = {
  active: 'Active',
  accepted: 'Accepted',
  declined: 'Declined',
  expired: 'Expired',
}

function formatUpdatedAt(updatedAt) {
  if (!updatedAt) {
    return 'New'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(updatedAt))
}

function ConversationDashboard({ conversations, onOpenConversation, onClearHistory }) {
  return (
    <Surface className="p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <p className="text-sm font-semibold text-stone-950">Local dashboard</p>
          <p className="mt-1 text-sm text-stone-500">Saved in this browser only. No login or cloud sync.</p>
        </div>
        {conversations.length > 0 && (
          <Button onClick={onClearHistory} variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Clear
          </Button>
        )}
      </div>

      {conversations.length === 0 ? (
        <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50/70 p-5 text-sm leading-6 text-stone-500">
          Start a buyer or seller chat. Your local sessions will appear here.
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.slice(0, 5).map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onOpenConversation(conversation)}
              className="w-full rounded-lg border border-stone-200 bg-white p-4 text-left shadow-sm shadow-stone-900/5 transition hover:border-primary-200 hover:bg-primary-50/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold capitalize text-stone-950">
                  {conversation.mode} negotiation
                </span>
                <span className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-800">
                  {statusLabels[conversation.status] ?? statusLabels.active}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">
                {conversation.summary}
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-stone-400">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {formatUpdatedAt(conversation.updatedAt)}
              </p>
            </button>
          ))}
        </div>
      )}
    </Surface>
  )
}

export default ConversationDashboard
