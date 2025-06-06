type Layout = {
  header: { styles: any; template: any };
  footer: { styles: any; template: any };
  pages: Record<string, { styles: any; template: any }>;
};

export const layout: Layout = {
  header: {
    styles: {
      children: {
        ".body": {
          attributes: {
            "font-family": "Arial, sans-serif",
            margin: "0",
            padding: "0",
            "background-color": "#f3f4f6",
          },
        },
        ".body a": {
          attributes: {
            color: "var(--primary-color, #1e40af)",
          },
        },
        ".header": {
          attributes: {
            display: "flex",
            "justify-content": "space-between",
            "align-items": "center",
            padding: "16px",
            "background-color": "#ffffff",
            "border-bottom": "1px solid #e5e7eb",
          },
        },
        ".header__logo": {
          attributes: {
            "font-size": "20px",
            "font-weight": "bold",
            color: "#1e293b",
          },
        },
        ".header__nav": {
          attributes: {
            display: "flex",
            gap: "24px",
          },
        },
        ".header__link": {
          attributes: {
            color: "#1e293b",
            "text-decoration": "none",
            "font-size": "16px",
          },
        },
      },
      attributes: [],
    },
    template: {
      tagName: "header",
      attrs: {
        className: ["header"],
      },
      children: [
        {
          tagName: "div",
          attrs: {
            className: ["header__logo"],
          },
          text: {
            editor: true,
            source: {
              typeData: "data",
              value: "twig.logo",
            },
            tooltip: {
              headers: true,
              bold: true,
              italic: true,
              underline: true,
              strikethrough: true,
              uppercase: true,
              fontSize: true,
              lineHeight: true,
              letterSpacing: true,
              align: true,
              link: true,
              ol: true,
              ul: true,
              color: true,
              clear: true,
            },
          },
        },
        {
          tagName: "nav",
          attrs: {
            className: ["header__nav"],
          },
          children: [
            {
              tagName: "a",
              attrs: {
                className: ["header__link"],
              },
              text: {
                editor: null,
                source: {
                  typeData: "data",
                  value: "twig.menu_Home",
                },
              },
            },
            {
              tagName: "a",
              attrs: {
                className: ["header__link"],
              },
              text: {
                editor: null,
                source: {
                  typeData: "data",
                  value: "twig.menu_About",
                },
              },
            },
            {
              tagName: "a",
              attrs: {
                className: ["header__link"],
              },
              text: {
                editor: null,
                source: {
                  typeData: "data",
                  value: "twig.menu_Contact",
                },
              },
            },
          ],
        },
      ],
    },
  },
  pages: {
    "1": {
      styles: {
        children: {
          ".signin": {
            attributes: {
              display: "flex",
              "justify-content": "center",
              "align-items": "center",
              padding: "40px 0",
              "background-color": "#f9fafb",
            },
          },
          ".signin__container": {
            attributes: {
              width: "100%",
              "max-width": "400px",
              "background-color": "#ffffff",
              padding: "24px",
              border: "1px solid #e5e7eb",
              "border-radius": "8px",
            },
          },
          ".signin__title": {
            attributes: {
              "font-size": "24px",
              "font-weight": "bold",
              "margin-bottom": "24px",
              color: "#1e293b",
              "text-align": "center",
            },
          },
          ".signin__form-group": {
            attributes: {
              "margin-bottom": "16px",
            },
          },
          ".signin__label": {
            attributes: {
              display: "block",
              "font-size": "14px",
              "margin-bottom": "8px",
              color: "#334155",
            },
          },
          ".signin__input": {
            attributes: {
              width: "100%",
              padding: "10px",
              border: "1px solid #cbd5e1",
              "border-radius": "4px",
              "font-size": "14px",
            },
          },
          ".signin__button": {
            attributes: {
              width: "100%",
              padding: "12px",
              "background-color": "#1e40af",
              color: "white",
              "font-weight": "bold",
              border: "none",
              "border-radius": "4px",
              "font-size": "14px",
              cursor: "pointer",
            },
          },
          ".signin__footer-text": {
            attributes: {
              "font-size": "13px",
              color: "#475569",
              "text-align": "center",
              "margin-top": "16px",
            },
          },
        },
        attributes: [],
      },
      template: {
        tagName: "section",
        attrs: {
          className: ["signin"],
        },
        children: [
          {
            tagName: "div",
            attrs: {
              className: ["signin__container"],
            },
            children: [
              {
                tagName: "h2",
                attrs: {
                  className: ["signin__title"],
                },
                text: {
                  editor: true,
                  source: {
                    typeData: "data",
                    value: "twig.title",
                  },
                  tooltip: {
                    headers: true,
                    bold: true,
                    align: true,
                    fontSize: true,
                  },
                },
              },
              {
                tagName: "form",
                attrs: {
                  className: ["signin__form"],
                },
                children: [
                  {
                    tagName: "div",
                    attrs: {
                      className: ["signin__form-group"],
                    },
                    children: [
                      {
                        tagName: "label",
                        attrs: {
                          className: ["signin__label"],
                        },
                        text: {
                          editor: null,
                          source: {
                            typeData: "data",
                            value: "twig.form_email_label",
                          },
                        },
                      },
                      {
                        tagName: "input",
                        attrs: {
                          className: ["signin__input"],
                        },
                      },
                    ],
                  },
                  {
                    tagName: "div",
                    attrs: {
                      className: ["signin__form-group"],
                    },
                    children: [
                      {
                        tagName: "label",
                        attrs: {
                          className: ["signin__label"],
                        },
                        text: {
                          editor: null,
                          source: {
                            typeData: "data",
                            value: "twig.form_password_label",
                          },
                        },
                      },
                      {
                        tagName: "input",
                        attrs: {
                          className: ["signin__input"],
                        },
                      },
                    ],
                  },
                  {
                    tagName: "button",
                    attrs: {
                      className: ["signin__button"],
                    },
                    text: {
                      editor: null,
                      source: {
                        typeData: "data",
                        value: "twig.form_button",
                      },
                    },
                  },
                ],
              },
              {
                tagName: "p",
                attrs: {
                  className: ["signin__footer-text"],
                },
                children: [
                  {
                    tagName: "a",
                    attrs: {},
                    text: {
                      editor: null,
                      source: {
                        typeData: "data",
                        value: "twig.footer_text",
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    "2": {
      styles: {
        children: {
          ".table-block": {
            attributes: {
              padding: "40px 0",
              "background-color": "#f8fafc",
              display: "flex",
              "justify-content": "center",
            },
          },
          ".table-block__container": {
            attributes: {
              width: "100%",
              "max-width": "800px",
              padding: "24px",
              "background-color": "#ffffff",
              border: "1px solid #e2e8f0",
              "border-radius": "8px",
            },
          },
          ".table-block__title": {
            attributes: {
              "font-size": "20px",
              "font-weight": "bold",
              "margin-bottom": "16px",
              color: "#1e293b",
              "text-align": "center",
            },
          },
          ".table-block__table": {
            attributes: {
              width: "100%",
              "border-collapse": "collapse",
            },
          },
          ".table-block__th": {
            attributes: {
              padding: "12px",
              border: "1px solid #cbd5e1",
              "text-align": "left",
              "font-size": "14px",
              "background-color": "#f1f5f9",
              "font-weight": "600",
              color: "#0f172a",
            },
          },
          ".table-block__td": {
            attributes: {
              padding: "12px",
              border: "1px solid #cbd5e1",
              "text-align": "left",
              "font-size": "14px",
            },
          },
        },
        attributes: [],
      },
      template: {
        tagName: "section",
        attrs: {
          className: ["table-block"],
        },
        children: [
          {
            tagName: "div",
            attrs: {
              className: ["table-block__container"],
            },
            children: [
              {
                tagName: "h2",
                attrs: {
                  className: ["table-block__title"],
                },
                text: {
                  editor: true,
                  source: {
                    typeData: "data",
                    value: "twig.title",
                  },
                  tooltip: {
                    headers: true,
                    bold: true,
                    italic: true,
                    underline: true,
                    strikethrough: true,
                    uppercase: true,
                    fontSize: true,
                    lineHeight: true,
                    letterSpacing: true,
                    align: true,
                    link: true,
                    color: true,
                  },
                },
              },
              {
                tagName: "table",
                attrs: {
                  className: ["table-block__table"],
                },
                children: [
                  {
                    tagName: "thead",
                    attrs: {},
                    children: [
                      {
                        tagName: "tr",
                        attrs: {},
                        children: [
                          {
                            tagName: "th",
                            attrs: {
                              className: ["table-block__th"],
                            },
                            text: {
                              editor: null,
                              source: {
                                typeData: "data",
                                value: "twig.table_thead_name",
                              },
                            },
                          },
                          {
                            tagName: "th",
                            attrs: {
                              className: ["table-block__th"],
                            },
                            text: {
                              editor: null,
                              source: {
                                typeData: "data",
                                value: "twig.table_thead_role",
                              },
                            },
                          },
                          {
                            tagName: "th",
                            attrs: {
                              className: ["table-block__th"],
                            },
                            text: {
                              editor: null,
                              source: {
                                typeData: "data",
                                value: "twig.table_thead_email",
                              },
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    tagName: "tbody",
                    attrs: {},
                    children: [
                      {
                        tagName: "tr",
                        attrs: {},
                        children: [
                          {
                            tagName: "td",
                            attrs: {
                              className: ["table-block__td"],
                            },
                            text: {
                              editor: null,
                              source: {
                                typeData: "data",
                                value: "twig.table_row1_name",
                              },
                            },
                          },
                          {
                            tagName: "td",
                            attrs: {
                              className: ["table-block__td"],
                            },
                            text: {
                              editor: null,
                              source: {
                                typeData: "data",
                                value: "twig.table_row1_role",
                              },
                            },
                          },
                          {
                            tagName: "td",
                            attrs: {
                              className: ["table-block__td"],
                            },
                            text: {
                              editor: null,
                              source: {
                                typeData: "data",
                                value: "twig.table_row1_email",
                              },
                            },
                          },
                        ],
                      },
                      {
                        tagName: "tr",
                        attrs: {},
                        children: [
                          {
                            tagName: "td",
                            attrs: {
                              className: ["table-block__td"],
                            },
                            text: {
                              editor: null,
                              source: {
                                typeData: "data",
                                value: "twig.table_row2_name",
                              },
                            },
                          },
                          {
                            tagName: "td",
                            attrs: {
                              className: ["table-block__td"],
                            },
                            text: {
                              editor: null,
                              source: {
                                typeData: "data",
                                value: "twig.table_row2_role",
                              },
                            },
                          },
                          {
                            tagName: "td",
                            attrs: {
                              className: ["table-block__td"],
                            },
                            text: {
                              editor: null,
                              source: {
                                typeData: "data",
                                value: "twig.table_row2_email",
                              },
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
  footer: {
    styles: {
      children: {
        ".footer": {
          attributes: {
            display: "flex",
            "justify-content": "space-between",
            "align-items": "center",
            padding: "16px",
            "background-color": "#f8fafc",
            "border-top": "1px solid #e5e7eb",
          },
        },
        ".footer__text": {
          attributes: {
            "font-size": "14px",
            color: "#64748b",
          },
        },
        ".footer__links": {
          attributes: {
            display: "flex",
            gap: "16px",
          },
        },
        ".footer__link": {
          attributes: {
            color: "#334155",
            "text-decoration": "none",
            "font-size": "14px",
          },
        },
      },
      attributes: [],
    },
    template: {
      tagName: "footer",
      attrs: {
        className: ["footer"],
      },
      children: [
        {
          tagName: "div",
          attrs: {
            className: ["footer__text"],
          },
          text: {
            editor: true,
            source: {
              typeData: "data",
              value: "twig.copyright",
            },
            tooltip: {
              bold: true,
              italic: true,
              fontSize: true,
              align: true,
              color: true,
            },
          },
        },
        {
          tagName: "div",
          attrs: {
            className: ["footer__links"],
          },
          children: [
            {
              tagName: "a",
              attrs: {
                className: ["footer__link"],
              },
              text: {
                editor: null,
                source: {
                  typeData: "data",
                  value: "twig.footer_links_Privacy",
                },
              },
            },
            {
              tagName: "a",
              attrs: {
                className: ["footer__link"],
              },
              text: {
                editor: null,
                source: {
                  typeData: "data",
                  value: "twig.footer_links_Terms",
                },
              },
            },
            {
              tagName: "a",
              attrs: {
                className: ["footer__link"],
              },
              text: {
                editor: null,
                source: {
                  typeData: "data",
                  value: "twig.footer_links_Support",
                },
              },
            },
          ],
        },
      ],
    },
  },
};

export const footerTwigData = {
  twig: {
    copyright: {
      blocks: [
        {
          key: "5eq4l",
          text: "© 2025 Your Company. All rights reserved.",
          type: "unstyled",
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
    footer_links_Privacy: "Privacy",
    footer_links_Terms: "Terms",
    footer_links_Support: "Support",
  },
};

export const headerTwigData = {
  twig: {
    logo: {
      blocks: [
        {
          key: "pibq",
          text: "BrandName",
          type: "unstyled",
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
    menu_Home: "Home",
    menu_About: "About",
    menu_Contact: "Contact",
  },
};

export const blockPageData = {
  "1": {
    twig: {
      title: {
        blocks: [
          {
            key: "d09on",
            text: "Sign In to Your Account",
            type: "unstyled",
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
      form_email_label: "Email",
      form_password_label: "Password",
      form_button: "Sign In",
      footer_text: "Register",
    },
  },
  "2": {
    twig: {
      title: {
        blocks: [
          {
            key: "c8npu",
            text: "Team Members",
            type: "unstyled",
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      },
      table_thead_name: "Name",
      table_thead_role: "Role",
      table_thead_email: "Email",
      table_row1_name: "Alice Johnson",
      table_row1_role: "Designer",
      table_row1_email: "alice@example.com",
      table_row2_name: "Bob Smith",
      table_row2_role: "Developer",
      table_row2_email: "bob@example.com",
    },
  },
};
