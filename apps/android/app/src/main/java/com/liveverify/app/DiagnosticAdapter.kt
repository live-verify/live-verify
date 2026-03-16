/*
 * Copyright (C) 2025, Paul Hammant
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.liveverify.app

import android.graphics.Bitmap
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

/**
 * ViewPager2 adapter for diagnostic tabs showing:
 * - Tab 0: Captured image
 * - Tab 1: Extracted (raw OCR) text with return symbols
 * - Tab 2+: Normalized text + hash for each candidate attempt
 *
 * On successful verification: single "Normalized" tab (the winning candidate).
 * On failure: one tab per failed candidate ("Normalized-1", "Normalized-2", etc.)
 * so the user can see what each attempt looked like.
 */
class DiagnosticAdapter : RecyclerView.Adapter<DiagnosticAdapter.DiagnosticViewHolder>() {

    data class NormalizedCandidate(val text: String, val hash: String)

    var capturedImage: Bitmap? = null
        set(value) {
            field = value
            notifyItemChanged(0)
        }

    var extractedText: String = ""
        set(value) {
            field = value
            notifyItemChanged(1)
        }

    /** The candidates to show as normalized tabs. On success, just one entry. */
    private var normalizedCandidates: List<NormalizedCandidate> = emptyList()

    fun setNormalizedCandidates(candidates: List<NormalizedCandidate>) {
        val oldCount = itemCount
        normalizedCandidates = candidates
        val newCount = itemCount
        // Refresh all items from position 2 onward
        if (oldCount > 2) notifyItemRangeRemoved(2, oldCount - 2)
        if (newCount > 2) notifyItemRangeInserted(2, newCount - 2)
    }

    override fun getItemCount(): Int = 2 + normalizedCandidates.size

    fun getTabTitle(position: Int): String = when {
        position == 0 -> "Captured"
        position == 1 -> "Extracted"
        normalizedCandidates.size == 1 -> "Normalized"
        else -> "Normalized-${position - 1}"
    }

    override fun getItemViewType(position: Int): Int = if (position == 0) 0 else 1

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DiagnosticViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return when (viewType) {
            0 -> {
                val view = inflater.inflate(R.layout.diagnostic_image, parent, false)
                ImageViewHolder(view)
            }
            else -> {
                val view = inflater.inflate(R.layout.diagnostic_text, parent, false)
                TextViewHolder(view)
            }
        }
    }

    override fun onBindViewHolder(holder: DiagnosticViewHolder, position: Int) {
        when (holder) {
            is ImageViewHolder -> {
                if (capturedImage != null) {
                    holder.imageView.setImageBitmap(capturedImage)
                    holder.imageView.visibility = android.view.View.VISIBLE
                    holder.noImageText?.visibility = android.view.View.GONE
                } else {
                    holder.imageView.visibility = android.view.View.GONE
                    holder.noImageText?.visibility = android.view.View.VISIBLE
                }
            }
            is TextViewHolder -> {
                when {
                    position == 1 -> {
                        holder.textView.text = DiagnosticHelper.withReturnSymbols(extractedText)
                    }
                    position >= 2 -> {
                        val candidateIndex = position - 2
                        if (candidateIndex < normalizedCandidates.size) {
                            val candidate = normalizedCandidates[candidateIndex]
                            val text = buildString {
                                append(candidate.text)
                                if (candidate.hash.isNotEmpty()) {
                                    append("\n\n---\nHash: ")
                                    append(candidate.hash)
                                }
                            }
                            holder.textView.text = text
                        }
                    }
                }
            }
        }
    }

    abstract class DiagnosticViewHolder(view: View) : RecyclerView.ViewHolder(view)

    class ImageViewHolder(view: View) : DiagnosticViewHolder(view) {
        val imageView: ImageView = view.findViewById(R.id.diagnosticImage)
        val noImageText: TextView? = view.findViewById(R.id.noImageText)
    }

    class TextViewHolder(view: View) : DiagnosticViewHolder(view) {
        val textView: TextView = view.findViewById(R.id.diagnosticText)
    }
}
