"use client";

import { useState } from "react";
import { MENU, MENU_CATEGORIES } from "@/lib/menu";

export default function MenuList() {
  const [category, setCategory] = useState("all");

  const groups =
    category === "all" ? MENU : MENU.filter((g) => g.category === category);

  return (
    <>
      <div className="filter-row" style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
        {MENU_CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`pds-tag${category === c.id ? " selected" : ""}`}
            onClick={() => setCategory(c.id)}
            aria-pressed={category === c.id}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {groups.map((group) => (
          <div className="menu-group" key={group.heading}>
            <div className="micro">
              <span className="tag-dot" />
              {group.heading}
            </div>

            {group.items.map((item, i) => (
              <div
                className={`menu-item${item.note ? " menu-item--note" : ""}`}
                key={item.name ?? `note-${i}`}
              >
                {item.name && (
                  <>
                    <span className="name">
                      {item.star && (
                        <span className="name-star" aria-label="House favourite">
                          ◆
                        </span>
                      )}
                      {item.name}
                    </span>
                    <span className="price">{item.price}</span>
                  </>
                )}
                {item.desc && <span className="desc">{item.desc}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
