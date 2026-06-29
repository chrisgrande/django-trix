from setuptools import setup

long_description = open('README.rst').read()

setup(
    name="django-trix",
    version='0.3.4',
    packages=["trix"],
    include_package_data=True,
    description="Trix rich text editor widget for Django",
    url="https://github.com/chrisgrande/django-trix",
    author="Jeremy Carbaugh",
    author_email="jeremy@isl.co",
    license='BSD',
    long_description=long_description,
    platforms=["any"],
    classifiers=[
        "Development Status :: 4 - Beta",
        "Environment :: Web Environment",
        "Framework :: Django",
        "Framework :: Django :: 4.2",
        "Framework :: Django :: 5.2",
        "Intended Audience :: Developers",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
)
