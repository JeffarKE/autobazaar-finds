"use client";

import { Eye, Loader2, Save, Send, Trash2 } from "lucide-react";

type Props = {
  isEditing: boolean;
  isPublishing: boolean;
  onSaveDraftAction: () => void;
  onPreviewAction: () => void;
  onPublishAction: () => void;
  onDeleteAction: () => void;
};

export default function PublishBar({
  isEditing,
  isPublishing,
  onSaveDraftAction,
  onPreviewAction,
  onPublishAction,
  onDeleteAction,
}: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">
        {isEditing ? "Edit Listing" : "Publish Listing"}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {isEditing
          ? "Review your changes and save the updated vehicle listing."
          : "Save your progress locally or publish the vehicle when it is complete."}
      </p>

      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={onSaveDraftAction}
          disabled={isPublishing}
          className="flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-5 w-5" /> Save Draft
        </button>

        <button
          type="button"
          onClick={onPreviewAction}
          disabled={isPublishing}
          className="flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Eye className="h-5 w-5" /> Preview Listing
        </button>

        <button
          type="button"
          onClick={onPublishAction}
          disabled={isPublishing}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          {isPublishing ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}

          {isPublishing
            ? isEditing
              ? "Saving..."
              : "Publishing..."
            : isEditing
              ? "Save Changes"
              : "Publish Vehicle"}
        </button>
      </div>

      <div className="mt-8 border-t pt-6">
        <button
          type="button"
          onClick={onDeleteAction}
          disabled={isPublishing}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Trash2 className="h-5 w-5" /> Clear Listing
        </button>
      </div>
    </section>
  );
}