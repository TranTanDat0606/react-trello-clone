import { z } from "zod";

// ===================== SCHEMAS =====================
export const listSchema = z.object({
  id: z.string(),
  title: z.string(),
  cards: z.array(z.string()),
});

export const cardSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  members: z.array(z.string()),
});

export const memberSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
});

export const trelloSchema = z.object({
  columns: z.array(z.string()),
  lists: z.record(z.string(), listSchema),
  cards: z.record(z.string(), cardSchema),
  members: z.record(z.string(), memberSchema),
});

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(30, "Title must not exceed 30 characters"),
  desc: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(200, "Description must not exceed 200 characters"),
  image: z.string().optional(),
  members: z.array(z.string()).min(1, "At least one member must be selected"),
});

// ===================== TYPES =====================
export type IListItem = z.infer<typeof listSchema>;
export type ICardItem = z.infer<typeof cardSchema>;
export type IMember = z.infer<typeof memberSchema>;
export type ITrello = z.infer<typeof trelloSchema>;
export type IFormInput = z.infer<typeof formSchema>;

// ===================== PROPS =====================
export interface TrelloListProps {
  index: number;
  listItem: IListItem;
  cards: ICardItem[];
}

export interface SimpleCardProps {
  index: number;
  card: ICardItem;
  listId: string;
}
