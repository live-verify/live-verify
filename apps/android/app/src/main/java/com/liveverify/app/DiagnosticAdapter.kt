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
 * - Tab 2: Normalized text + hash
 */
class DiagnosticAdapter : RecyclerView.Adapter<DiagnosticAdapter.DiagnosticViewHolder>() {

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

    var normalizedText: String = ""
        set(value) {
            field = value
            notifyItemChanged(2)
        }

    var computedHash: String = ""
        set(value) {
            field = value
            notifyItemChanged(2)
        }

    override fun getItemCount(): Int = 3

    override fun getItemViewType(position: Int): Int = position

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
                when (position) {
                    1 -> {
                        holder.textView.text = DiagnosticHelper.withReturnSymbols(extractedText)
                    }
                    2 -> {
                        val text = buildString {
                            append(normalizedText)
                            if (computedHash.isNotEmpty()) {
                                append("\n\n---\nHash: ")
                                append(computedHash)
                            }
                        }
                        holder.textView.text = text
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
