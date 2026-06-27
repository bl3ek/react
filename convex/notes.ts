import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getNotes = query({
  args: { filter: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const q = ctx.db.query("notes");
    if (args.filter === "active") {
      return await q
        .filter((f) => f.eq(f.field("isCompleted"), false))
        .order("desc")
        .collect();
    }
    if (args.filter === "completed") {
      return await q
        .filter((f) => f.eq(f.field("isCompleted"), true))
        .order("desc")
        .collect();
    }
    return await q.order("desc").collect();
  },
});

export const addNote = mutation({
  args: {
    text: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notes", {
      text: args.text,
      isCompleted: false,
      category: args.category,
    });
  },
});

export const toggleNote = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.id);
    if (!note) throw new ConvexError("Note not found");
    return await ctx.db.patch(args.id, { isCompleted: !note.isCompleted });
  },
});

export const deleteNote = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.id);
    if (!note) throw new ConvexError("Note not found");
    return await ctx.db.delete(args.id);
  },
});

export const updateNoteCategory = mutation({
  args: {
    id: v.id("notes"),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.id);
    if (!note) throw new ConvexError("Note not found");
    return await ctx.db.patch(args.id, { category: args.category });
  },
});

export const clearAllNotes = mutation({
  args: {},
  handler: async (ctx) => {
    const notes = await ctx.db.query("notes").collect();
    await Promise.all(notes.map((note) => ctx.db.delete(note._id)));
  },
});
