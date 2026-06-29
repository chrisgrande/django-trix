from trix.widgets import TrixEditor


class TrixAdmin:

    def formfield_for_dbfield(self, db_field, **kwargs):
        if not hasattr(self, 'trix_fields'):
            raise ValueError('trix_fields is required on model')

        if db_field.name in self.trix_fields:
            return db_field.formfield(widget=TrixEditor())
        return super().formfield_for_dbfield(db_field, **kwargs)
