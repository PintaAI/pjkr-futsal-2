export interface Announcement {
  id: number
  type: 'weather' | 'schedule' | 'meeting' | 'referee'
  title: string
  content: string
  priority: 'high' | 'medium' | 'low'
  date: string
}

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    type: 'weather',
    title: 'Heavy Rain Expected',
    content: 'Matches on Saturday afternoon may be affected by heavy rainfall. Indoor court backup has been arranged.',
    priority: 'high',
    date: '2025-03-30T09:00:00'
  },
  {
    id: 2,
    type: 'schedule',
    title: 'Updated Match Schedule',
    content: 'Group B matches have been rescheduled to accommodate venue maintenance. Please check the fixtures page.',
    priority: 'high',
    date: '2025-03-29T14:30:00'
  },
  {
    id: 3,
    type: 'meeting',
    title: 'Technical Meeting Reminder',
    content: 'Mandatory team captain meeting on April 14th, 7 PM at Sinansan Futsal Park meeting room.',
    priority: 'medium',
    date: '2025-03-28T11:00:00'
  },
  {
    id: 4,
    type: 'referee',
    title: 'Referee Guidelines Update',
    content: 'New FIFA futsal rules regarding the 4-second rule will be strictly enforced.',
    priority: 'medium',
    date: '2025-03-27T16:15:00'
  }
]
