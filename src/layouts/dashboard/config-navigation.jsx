import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';
import { useAuthContext } from "../../auth/hooks";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();
  const { user } = useAuthContext();
  const isAdmin = user?.role === 'admin';

  const data = useMemo(
    () => [
      // OVERVIEW
      {
        subheader: t('overview'),
        items: [
          {
            title: t('app'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
        ],
      },

      // MANAGEMENT
      {
        subheader: t('management'),
        items: [
          ...(isAdmin
            ? [
              {
                title: t('user'),
                path: paths.dashboard.user.root,
                icon: ICONS.user,
                children: [
                  { title: t('profile'), path: paths.dashboard.user.root },
                  { title: t('cards'), path: paths.dashboard.user.cards },
                  { title: t('list'), path: paths.dashboard.user.list },
                  { title: t('create'), path: paths.dashboard.user.new },
                  { title: t('edit'), path: paths.dashboard.user.demo.edit },
                  { title: t('account'), path: paths.dashboard.user.account },
                ],
              },
            ]
            : []),
          // Forms
          {
            title: t('forms'),
            path: paths.dashboard.job.root,
            icon: ICONS.job,
            children: [
              { title: t('review'), path: paths.dashboard.forms.root },
              { title: t('fill'), path: paths.dashboard.forms.new },
            ],
          },
        ],
      },

      // CONFIGURATIONS (solo si es admin)
      ...(isAdmin
        ? [
          {
            subheader: t('configurations'),
            items: [
              {
                title: t('configurations'),
                path: paths.dashboard.job.root,
                icon: ICONS.lock,
                children: [
                  { title: t('list'), path: paths.dashboard.forms.root },
                  { title: t('create'), path: paths.dashboard.forms.new },
                ],
              },
            ],
          },
        ]
        : []),
    ],
    [t, isAdmin]
  );

  return data;
}
